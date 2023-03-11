import Head from "next/head";

interface Props {
  title?: string;
  subTitle?: string;
  description?: string;
}

const SEOHead: React.FC<Props> = ({ description, subTitle, title }) => (
  <Head>
    <title>{`${title ?? "Azatoi | "}${
      subTitle ?? "Ngesub sambil tiduran"
    }`}</title>
    <meta name="description" content={description ?? "Ngesub sambil tiduran"} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
export default SEOHead;
