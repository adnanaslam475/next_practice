import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ articles }) => {
    return (
        <div>
            {articles.map((v, i) => {
                return <ArticleItem item={v} key={i} />
            })}
        </div>
    )
}
export default ArticleList;