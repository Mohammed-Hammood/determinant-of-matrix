"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { det2x2, det3x3, det4x4, det5x5, det6x6 } from "utils";

type Props = {
	$rowsColumnsNumber: number
}

const Container = styled.main<Props>`
    display: flex;
    justify-content: center;
    min-height: 100vmin;
	height:100%;
    align-items: flex-start;
    padding:10px;
    background-color: var(--mainColor);
    .center-content {
        width:100%;
        display: flex;
        justify-content: center;
        flex-direction:column;
        max-width: 550px;
        padding:0;
        gap:10px;
        &__panel {
            border-radius: 15px;
            width:100%;
            margin-top:10px;
            justify-content: space-around;
            background-color: white;
            border:1px solid lightgray; 
            flex-direction: row;
            display: flex;
            flex-wrap: wrap;
            gap:5px;
            padding:10px;
            div {
                display: flex;
                justify-content: space-around;
                width:100%;
                span {
                    background-color: black;
                    color:white;
                    border-radius: 5px;
                    font-size:16px;
                    padding:8px 10px;
                }
                button:hover {
                    transform: scale(1.2);
                }
                button:active {
                    transform: translate3d(1px, 1px, 1px);
                }
                button {
                    cursor: pointer;
                    padding:5px 15px;
                    min-width:40px;
                    outline:none;
                    border:none;
                    border-radius: 10px;
                    font-size:20px;
                    background-color: var(--mainColor);
                    color:white;
                }
            }
        }
        &__card {
            border:1px solid lightgray;
            border-radius: 10px;
            padding:10px;
            display: flex;
            justify-content: center;
            flex-direction:row;
            flex-wrap:wrap;
            align-items:center;
            width:100%;
            max-width:100%;
            background-color:white;
            min-height:47px;
            .boxes {
                display:flex;
                justify-content: center;
                align-items: center;
                gap:10px;
                flex-wrap:wrap;
                .box {
                    border:1px solid black;
                    display: flex;
                    flex: 1 1 ${props => Math.floor((100 / props.$rowsColumnsNumber) - 3)}%;
                    input:focus {
                        outline:1px solid var(--mainColor);
                    }
                    input {
                        min-height:45px;
                        height:100%; 
                        border:none;
                        width:100%;
                        padding:10px;
                    }
                    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button, input[type=number] {
                        -webkit-appearance: none; // chrome, opera, Safari, Edge
                        -moz-appearance: textfield; // firefox
                    }
                }
            }
        }
    }
`;
const DeterminantPage: React.FC = () => {
	const [rowsColumnsNumber, setRowsColumnsNumber] = useState<number>(3);
	const [message, setMessage] = useState<string>("");
	const [results, setResults] = useState<number | null>(null);
	const max = 6;
	const min = 2;
	const calculateDeterminant = (): void => {
		
		const inputs = document.querySelectorAll(".boxes input") as NodeListOf<HTMLInputElement>;
		
		let values: any[] = [];
		
		inputs.forEach(item => { if (item.value.trim().length > 0) values.push(item.value.trim()) });
		
		setMessage("");

		values.forEach((item: number ) => {

			if (isNaN(item)) {
				
				setMessage(("Only numbers are allowed"));
			}
		})
		if (message.length === 0 && values.length === rowsColumnsNumber * rowsColumnsNumber) {
			
			values.forEach((element: string, index: number) => values[index] = parseInt(element));

			startCalculation(values);
		} else {
			setMessage(("All fields are required and only numbers are allowed"));
		}
	}
	const startCalculation = (numbers: number[]) => {

		if (rowsColumnsNumber === 2) {
			setResults(det2x2(numbers))
		} else if (rowsColumnsNumber === 3) {
			setResults(det3x3(numbers));
		} else if (rowsColumnsNumber === 4) {
			setResults(det4x4(numbers));
		} else if (rowsColumnsNumber === 5) {
			setResults(det5x5(numbers))
		}
		else if (rowsColumnsNumber === 6) {
			setResults(det6x6(numbers))
		}

	}
	const handleRowsColumnChanges = (operator: string): void => {
		setMessage('');
		if (operator === "+" && rowsColumnsNumber < max) {
			setRowsColumnsNumber(rowsColumnsNumber + 1);
			setResults(null);
		} else if (operator === '-' && rowsColumnsNumber > min) {
			setRowsColumnsNumber(rowsColumnsNumber - 1);
			setResults(null);
		}
	}
	return (
		<Container className='determinant-page' $rowsColumnsNumber={rowsColumnsNumber}>
			<div className='center-content' >
				<div className='center-content__panel'>
					<div>
						<span>{("(rows) x (columns)")}</span>
					</div>
					<div style={{ direction: "ltr" }}>
						<button type='button' onClick={() => handleRowsColumnChanges("+")}>+</button>
						<span>{rowsColumnsNumber} {("x")} {rowsColumnsNumber}</span>
						<button type='button' onClick={() => handleRowsColumnChanges("-")}>-</button>
					</div>
					<div>
						<button type='button' onClick={() => { calculateDeterminant() }}>{('Calculate')}</button>
					</div>
				</div>
				<div className='center-content__card'>
					<div onClick={() => setMessage('')}>{message}</div>
					<div className='boxes' id='boxes'>
						{(Array.from({ length: rowsColumnsNumber * rowsColumnsNumber })).map((item, index: number) => {
							return (
								<div key={index} className='box'>
									<input type='number' id={`${index}`} onChange={() => setMessage('')} />
								</div>
							);
						})}
					</div>
				</div>
				{results || results === 0 ?
					<div className='center-content__card'>
						{results}
					</div>
					: null}
			</div>
		</Container>
	)
}

export default DeterminantPage;