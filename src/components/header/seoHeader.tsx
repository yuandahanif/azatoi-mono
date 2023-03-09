import Head from "next/head";

interface Props {
  title?: string;
  subTitle?: string;
  description?: string;
}

const SEOHead: React.FC<Props> = ({ description, subTitle, title }) => (
  <Head>
    <title>{`${title ?? "Azatoi | "}${
      subTitle ?? "Fansub Tanjakan 48"
    }`}</title>
    <meta name="description" content={description ?? "Fansub Tanjakan 48"} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
export default SEOHead;
