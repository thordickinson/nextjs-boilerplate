import style from "./styles.module.scss";
import DefaultLayout from "../../components/layouts/default-layout";
import BrandsBanner from "../../components/banner/brands-banner";
import CountersBanner from "../../components/banner/counters-banner";
import FeaturesBanner from "../../components/banner/features-banner";



export default function Showcase() {

    //brands banner sponsors
    const sponsors = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map(n => `/img/brands/sponsor-${n}.png`);

    //counters banner
    const counters = [
        { icon: 'fa fa-download', label: 'Total downloaded', value: 2345 },
        { icon: 'fa fa-chart-bar', label: 'Grow on Year', value: 6543 },
        { icon: 'fa fa-star', label: 'Client Reviews', value: 3453 },
        { icon: 'fa fa-bookmark', label: 'People subscribed', value: 3453 }
    ]

    //features banner require this
    const features = [
        { title: "This is an awesome feature", description: "dont forget to set the features property" },
        { title: "You can set any icon", description: "Search for an icon on fontawesome and you can set it here", icon: "fas fa-award" },
        { title: "Set up to three elements", description: "Please set exactly three elements on this section", icon: "fas fa-bacterium" }
      ]

    return (
        <DefaultLayout>
        <div className={style.title}>
            <h1>Showcase</h1>
        </div>
        <div className={style.text}>Brands Banner</div>            
        <BrandsBanner logos={sponsors}></BrandsBanner>
        <div className={style.text}>Counters Banner</div>
        <CountersBanner counters={counters}></CountersBanner>
        <div className={style.text}>Features Banner</div>
        <FeaturesBanner 
            title="This is a Title for your features" 
            description="This is a long description for your services, This is a long description for your services." 
            features={features}
        ></FeaturesBanner>

        </DefaultLayout>
        
    )
}
