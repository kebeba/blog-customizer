import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group'
import { Select } from 'src/ui/select'
import { Separator } from 'src/ui/separator'
import { Text } from 'src/ui/text'
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose'
import { ArticleStateType, OptionType, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps'

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx'


type ArticleSidebarProps = {
	currentArticleState: ArticleStateType,
	setArticleState: (props: ArticleStateType) => void,
};


export const ArticleParamsForm = ({currentArticleState, setArticleState} : ArticleSidebarProps) => {
	const [sidebarArticleState, setSidebarArticleState] = useState<ArticleStateType>(currentArticleState);
	const [sidebarIsActive, setSidebarIsActive] = useState<boolean>(false);
	const rootElementReference = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: sidebarIsActive,
		rootRef: rootElementReference,
		onClose: () => setSidebarIsActive(false),
		onChange: setSidebarIsActive,
	});

	const handleSidebarActivation = () => {
		setSidebarIsActive(!sidebarIsActive)
	}

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSidebarArticleState({...sidebarArticleState, [key]: value});

	};

	const handleSettingsApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(sidebarArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={sidebarIsActive} onClick={handleSidebarActivation} />
			<aside ref={rootElementReference} className={clsx(styles.container, sidebarIsActive && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSettingsApply}>
					<Text size={31} family='open-sans' weight={800} uppercase>Задайте параметры</Text>
					<Select
						onChange={(option) => handleChange('fontFamilyOption', option)}
						options={fontFamilyOptions}
						selected={sidebarArticleState.fontFamilyOption}
						title='цвет'
					></Select>
					<RadioGroup
						name='font-size'
						onChange={(option) => handleChange('fontSizeOption', option)}
						options={fontSizeOptions}
						selected={sidebarArticleState.fontSizeOption}
						title='размер шрифта'
					></RadioGroup>
					<Select
						onChange={(option) => handleChange('fontColor', option)}
						options={fontColors}
						selected={sidebarArticleState.fontColor}
						title='цвет шрифта'
					></Select>
					<Separator></Separator>
					<Select
						onChange={(option) => handleChange('backgroundColor', option)}
						options={backgroundColors}
						selected={sidebarArticleState.backgroundColor}
						title='цвет фона'
					></Select>
					<Select
						onChange={(option) => handleChange('contentWidth', option)}
						options={contentWidthArr}
						selected={sidebarArticleState.contentWidth}
						title='ширина контента'
					></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
