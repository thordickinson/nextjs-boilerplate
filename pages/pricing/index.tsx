import DefaultLayout from "../../components/layouts/default-layout"
import Banner_Header from "../../components/banner/banner-header"
import style from "./styles.module.scss"

export default function Pricing() {
    const title = "Best App For Your Modern Lifestyle.";
    const descri = "We provide marketing services to startups and small businesses to looking for a partner of their digital media, design & development, lead generation and communications requirents.";
    const hashTag = "#Editors Choice App of 2020"

    return (
        <DefaultLayout>
            <Banner_Header title={title} description={descri} hashtag={hashTag}></Banner_Header>
        </DefaultLayout>
    )
}
