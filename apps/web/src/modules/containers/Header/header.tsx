import Head from "next/head";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <script async defer data-website-id="01b2b9a6-0e7c-42d7-980f-80af4b147deb" src="https://analytics.nlr.app/umami.js"></script>
    </Head>
  );
}
