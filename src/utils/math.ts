
export const det2x2 = (num: number[]): number => { return ((num[0] * num[3]) - (num[1] * num[2])) }
// 1 2
// 2 4

export const det3x3 = (matrix: number[]): number => {
    let arr: number[] = [];
    let result: number = 0;
    matrix.forEach((number, numberIndex) => {
        if (numberIndex < 3) {
            arr = matrix.filter((num, i) => {
                if (i < 6) {
                    return (i >= 3 && i - 3 !== numberIndex);
                } else {
                    return (i >= 3 && i - 6 !== numberIndex);
                }
            })
            result += (numberIndex === 1 ? -1 : 1) * det2x2(arr) * number;
        }
    })
    return result;
}

export const det4x4 = (matrix: number[]): number => {
    let arr: number[] = [];
    let result: number = 0;
    matrix.forEach((number, numberIndex) => {
        if (numberIndex < 4) {
            arr = matrix.filter((num, i) => {
                if (i < 8) {
                    return (i >= 4 && i - 4 !== numberIndex)
                } if (i >= 8 && i < 12) {
                    return (i >= 8 && i - 8 !== numberIndex)
                }
                else {
                    return (i >= 12 && i - 12 !== numberIndex)
                }
            })
            result += ((numberIndex === 1 || numberIndex === 3) ? -1 : 1) * number * det3x3(arr);
        }
    })
    return result;
}

export const det5x5 = (matrix: number[]): number => {
    let arr: number[] = [];
    let result: number = 0;
    matrix.forEach((number, numberIndex) => {
        if (numberIndex < 5) {
            arr = matrix.filter((num, i) => {
                if (i < 10) {
                    return (i >= 5 && i - 5 !== numberIndex)
                } if (i >= 10 && i < 15) {
                    return (i >= 5 && i - 10 !== numberIndex)
                }
                else if (i >= 15 && i < 20) {
                    return (i >= 5 && i - 15 !== numberIndex)
                }
                else {
                    return (i >= 5 && i - 20 !== numberIndex)
                }
            })
            result += ((numberIndex === 1 || numberIndex === 3) ? -1 : 1) * number * det4x4(arr);
        }
    })
    return result;
}

export const det6x6 = (matrix: number[]): number => {
    let arr: number[] = [];
    let result: number = 0;
    matrix.forEach((number, numberIndex) => {
        if (numberIndex < 6) {
            arr = matrix.filter((num, i) => {
                if (i < 12) {
                    return (i >= 6 && i - 6 !== numberIndex)
                } if (i >= 12 && i < 18) {
                    return (i >= 5 && i - 12 !== numberIndex)
                }
                else if (i >= 18 && i < 24) {
                    return (i >= 5 && i - 18 !== numberIndex)
                }
                else if (i >= 24 && i < 30) {
                    return (i >= 5 && i - 24 !== numberIndex)
                }
                else {
                    return (i >= 5 && i - 30 !== numberIndex)
                }
            })
            result += ((numberIndex === 1 || numberIndex === 3 || numberIndex === 5) ? -1 : 1) * number * det5x5(arr);
        }
    })
    return result;
}
