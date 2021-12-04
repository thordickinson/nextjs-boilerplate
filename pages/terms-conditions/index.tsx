import styles from "./styles.module.scss"
import DefaultLayout from "../../components/layouts/default-layout"

export default function Terms_Conditions() {

    const titleTerms="Terminos de Servicio de BoilerPlate";

    const bodyTerms="Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
    "Cumque exercitationem, eaque ducimus ab repellendus illo libero tenetur eos a blanditiis, " +
    "possimus alias ea officiis? Laborum, repudiandae cumque. Illo, a officia.";

    const subText = [
        {titlePol:"este es un sub-titulo de politica ", polici: "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo." +
        "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo." +
        "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo."},
        {titlePol:"este es un sub-titulo de politica ", polici: "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo." +
        "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo." +
        "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo."},
        {titlePol:"este es un sub-titulo de politica ", polici: "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo." +
        "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo." +
        "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
        "Iure voluptate id sapiente ex rem sit autem maxime iste eveniet commodi neque illum enim necessitatibus, " +
        "placeat fuga ullam? Dolores, obcaecati explicabo."}
    ];

    return (
        <DefaultLayout>
            <div className={styles.title_terms}>
                <h1>{titleTerms}</h1>
            </div>
            <div className={styles.terms_container}>
                <div className={styles.termsBody}>
                    <p>
                        {bodyTerms}
                    </p>
                </div>
                {subText.map((t, i) => 
                <div key={i} className={styles.object}>
                    <div className={styles.subtitle}>
                        <h3>{t.titlePol + i}</h3>
                    </div>
                    <div className={styles.body_subtext}>
                        <p>
                            {t.polici}
                        </p>
                    </div>
                </div>)}
            </div>
        </DefaultLayout>
    )
}
