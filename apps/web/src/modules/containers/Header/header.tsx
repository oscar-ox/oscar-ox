import Head from "next/head";

type Props = {
    title: string;
};

export function Header({ title }: Props) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}