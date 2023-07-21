import 'styles/normalize.scss';
import 'styles/globals.scss';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './register';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Determinant of a matrix',
	description: 'Caculation of determinant of a matrix. 3x3, 4x4, 5x5, 6x6 matrix',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel='icon' href='/calc-favicon.svg' type='image/icon-x' />
			</head>
			<body className={inter.className}>
				<StyledComponentsRegistry>
					{children}
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
