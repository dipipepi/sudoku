// @ts-ignore
import _ from 'lodash';
import { GameConfig } from '../App';

type pencilGridType = any[][] | undefined;

export class SudokuService {
    gameGrid: number[][] | undefined;
    solution: null | [number[]] = null;
    cellsCount: number;
    pencilGrid: pencilGridType;
    private maxNumber: number;
    private size: number;
    private maxEmptyCells = 0;

    constructor({size, difficultyLevel}: GameConfig) {
        this.size = size;
        this.maxNumber = Math.pow(this.size, 2);
        this.cellsCount = Math.pow(this.maxNumber, 2);
        this.maxEmptyCells = this.getEmptyCellsCount(difficultyLevel);
        this.createSudokuGrid();
        this.createPencilGrid();
    }

    private createPencilGrid() {
        const pencilGrid = [];

        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            const row = [];
            for (let j = 0; j < Math.pow(this.size, 2); j++) {
                row.push(new Array(9));
            }
            pencilGrid.push(row);
        }

        this.pencilGrid = pencilGrid;
    }

    private createSudokuGrid(): void {
        let grid: number[][] = this.createProtoGrid();
        grid = this.mixGrid(grid);
        this.solution = _.cloneDeep(grid);
        this.gameGrid = this.hideCells(grid);
    }

    private getEmptyCellsCount = (level: string): number => {
        let emptyCellsPercent = 0;

        switch (level) {
            case 'easy':
                emptyCellsPercent = 0.55;
                break;
            case 'middle':
                emptyCellsPercent = 0.60;
                break;
            case 'hard':
                emptyCellsPercent = 0.65;
                break;
            case 'ultraHard':
                emptyCellsPercent = 0.70;
                break;
        }

        return Math.trunc(this.cellsCount * emptyCellsPercent) + 1;
    }

    private createProtoGrid(): number[][]{
        let grid: number[][] = [];
        for(let i = 0; i < this.maxNumber; i++){
            if(i === 0) {
                grid.push(this.prepareFirstRow());
            } else {
                if(i % this.size === 0) {
                    grid.push(this.shiftArray(grid[i-1], this.size + 1));
                } else {
                    grid.push(this.shiftArray(grid[i-1], this.size));
                }
            }

        }

        return grid;
    }

    private transposing(grid: number[][]): number[][] {
        const clonedGrid: number[][] = _.cloneDeep(grid);
        return clonedGrid[0].map((col, i) => clonedGrid.map(row => row[i]));
    }

    private makeSmallRowsSwap(grid: number[][]): number[][] {
        const clonedGrid = _.cloneDeep(grid);
        let areaNumber = this.getRandomNumber(0, this.size - 1);
        const rangeOfRows = this.getRangeArray(areaNumber);
        const numberOfFirstRow = this.getRandomNumber(rangeOfRows[0], rangeOfRows[1]);
        let numberOfSecondRow = this.getRandomNumber(rangeOfRows[0], rangeOfRows[1]);
        while (numberOfSecondRow === numberOfFirstRow) {
            numberOfSecondRow = this.getRandomNumber(rangeOfRows[0], rangeOfRows[1]);
        }
        const firstRow = grid[numberOfFirstRow];
        const secondRow = grid[numberOfSecondRow];
        clonedGrid[numberOfFirstRow] = secondRow;
        clonedGrid[numberOfSecondRow] = firstRow;

        return clonedGrid;

    }

    private makeSmallCollumSwap(grid: number[][]): number[][] {
        let clonedGrid = _.cloneDeep(grid);
        clonedGrid = this.transposing(clonedGrid);
        clonedGrid = this.makeSmallRowsSwap(clonedGrid);
        return this.transposing(clonedGrid);
    }

    private makeBigRowsSwap(grid: number[][]): number[][] | void {
        const getRowsForBigSwap = (grid: number[][], range: number[]) => {
            const clonedGrid = _.cloneDeep(grid);
            const rowsForSwap = [];
            for(let i = range[0]; i <= range[range.length - 1]; i++) {
                rowsForSwap.push(clonedGrid[i]);
            }

            return rowsForSwap;
        }
        const createMap = (indexes: number[], arrays: number[][]) => {
            const map = new Map();
            for(let i = 0; i < indexes.length; i++) {
                map.set(indexes[i], arrays[i]);
            }

            return map;
        }
        let clonedGrid = _.cloneDeep(grid);
        let firstArrayToSwap = [];
        let secondArrayToSwap = [];
        const firstArea = this.getRandomNumber(0, this.size - 1);
        let secondArea = this.getRandomNumber(0, this.size - 1);
        while (secondArea === firstArea) {
            secondArea = this.getRandomNumber(0, this.size - 1);
        }
        const firstRowRangeOfArea = this.getRangeArray(firstArea, true);
        const secondRowRangeOfArea = this.getRangeArray(secondArea, true);

        firstArrayToSwap = getRowsForBigSwap(clonedGrid, firstRowRangeOfArea);
        secondArrayToSwap = getRowsForBigSwap(clonedGrid, secondRowRangeOfArea);
        const arraysAndInexes = createMap(secondRowRangeOfArea.concat(firstRowRangeOfArea), firstArrayToSwap.concat(secondArrayToSwap));
        for(let i = 0; i < Math.pow(this.size, 2); i++) {
            if(arraysAndInexes.has(i)) {
                clonedGrid[i] = arraysAndInexes.get(i);
            }
        }

        return clonedGrid;
    }
    
    private makeBigCollumSwap(grid: number[][]): number[][] {
        let clonedGrid = _.cloneDeep(grid);
        clonedGrid = this.transposing(clonedGrid);
        clonedGrid = this.makeBigRowsSwap(clonedGrid);
        return this.transposing(clonedGrid);
    }

    private mixGrid = (grid: number[][]): number[][] => {
        let clonedGrid = _.cloneDeep(grid);
        const numberOfActions = 10000;
        let mixingFunctions = [this.transposing, this.makeSmallRowsSwap, this.makeSmallCollumSwap, this.makeBigRowsSwap,
        this.makeBigCollumSwap];

        for (let i = 0; i < numberOfActions; i++) {
            const number = this.getRandomNumber(0, 4);
            clonedGrid = mixingFunctions[number].call(this, clonedGrid);
        }

        return clonedGrid;
    }

    private hideCells(grid: number[][]) {
        const clonedGrid = _.cloneDeep(grid);
        const cellsHaveToBeEmpty = new Map();

        while (cellsHaveToBeEmpty.size <= this.maxEmptyCells) {
            const firstIndex = this.getRandomNumber(0, this.maxNumber - 1);
            const secondIndex = this.getRandomNumber(0, this.maxNumber - 1);
            cellsHaveToBeEmpty.set(`x:${firstIndex}-y:${secondIndex}`, [firstIndex, secondIndex]);
        }

        // @ts-ignore
        for (const item of cellsHaveToBeEmpty.values()) {
            clonedGrid[item[0]][item[1]] = '';
        }

        return clonedGrid;
    }

    private prepareFirstRow(): number[] {
        const row = [];
        for(let i = 1; i < this.maxNumber + 1; i++){
            row.push(i);
        }

        return row;
    }

    private getRangeArray(areaNumber: number, isForBig?: boolean): number[] {
        const range = [];
        if(!isForBig){
            range.push(areaNumber * this.size);
            range.push(((areaNumber + 1) * this.size) - 1);

            return range;
        }

        for (let i = areaNumber * this.size; i <= ((areaNumber + 1) * this.size) - 1; i++){
            range.push(i);
        }

        return range;
    }

    private shiftArray(arr: number[], cnt: number): number[]{
        return arr.slice(cnt).concat(arr.slice(0,cnt));
    }

    private getRandomNumber(min: number, max: number): number{
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
}