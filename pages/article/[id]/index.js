import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
// import 
import Meta from '../../../components/Meta'

const index = () => {
    const router = useRouter();
    return (
        <div>
            <Meta title={article.title} description={article.excerpt} />
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href='/'>Go Back</Link>
        </div>
    )
}


export const getStaticProps = async (context) => {
    // const res = await fetch(`${server}/api/articles/${context.params.id}`)
    // const article = await res.json()

    // return {
    //     props: {
    //         article,
    //     },
    // }
}

export const getStaticPaths = async () => {
    const res = await fetch(`http:localhost:3000/api/articles`)

    const articles = await res.json()

    const ids = articles.map((article) => article.id)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))

    return {
        paths,
        fallback: false,
    }
}
export default index
