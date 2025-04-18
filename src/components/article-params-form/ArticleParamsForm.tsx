import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type Props = {
	state: ArticleStateType;
	setState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ state, setState }: Props) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(state.fontFamilyOption);
	const [fontSize, setFontSize] = useState(state.fontSizeOption);
	const [fontColor, setFontColor] = useState(state.fontColor);
	const [bgColor, setBgColor] = useState(state.backgroundColor);
	const [widthContent, setWidthContent] = useState(state.contentWidth);
	const formRef = useRef<HTMLFormElement>(null);

	const toggleSidebar = useCallback(() => {
		setIsFormOpen((prev) => !prev);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setState({
			...state,
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: widthContent,
			fontSizeOption: fontSize,
		});
		setIsFormOpen(false);
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setWidthContent(defaultArticleState.contentWidth);

		setState(defaultArticleState);
	};

	const handleClickOutside = useCallback((e: MouseEvent) => {
		!formRef.current?.contains(e.target as Node) && toggleSidebar();
	}, []);

	const handleEsc = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && toggleSidebar();
	}, []);

	useEffect(() => {
		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEsc);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEsc);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEsc);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleSidebar} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						family='open-sans'
						uppercase={true}
						align='left'
						fontStyle='normal'>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						name='fontSize'
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='цвет шрифиа'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setBgColor}
					/>
					<Select
						selected={widthContent}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setWidthContent}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
