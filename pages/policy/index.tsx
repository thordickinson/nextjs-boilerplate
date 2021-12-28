import styles from "./styles.module.scss"
import DefaultLayout from "../../components/layouts/default-layout"

export default function Policy() {

    const titlePolicy = "Politica de Privacidad BoilerPlate";

    const policy = "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!" +
    "Lorem ipsum dolor sit amet consectetur adipisicing elit." + 
    "Labore accusamus sapiente pariatur! Amet sint eius ipsam iusto eaque accusantium,"+
    " laboriosam magni perferendis velit ullam neque, aut, porro ipsum minima fuga!";


    return (
        <DefaultLayout>
            <div className={styles.title_policy}>
                <h1>{titlePolicy}</h1>
            </div>
            <div className={styles.section_policy_container}>
                <div className = {styles.bodyPolicy}>
                    <p>
                        {policy}
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}
