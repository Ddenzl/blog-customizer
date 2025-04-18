import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from './article-params-form';
import { Article } from './article';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [stateApp, setStateApp] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stateApp.fontFamilyOption.value,
					'--font-size': stateApp.fontSizeOption.value,
					'--font-color': stateApp.fontColor.value,
					'--container-width': stateApp.contentWidth.value,
					'--bg-color': stateApp.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm state={stateApp} setState={setStateApp} />
			<Article />
		</main>
	);
};
