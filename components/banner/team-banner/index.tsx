import style from "./index.module.scss"
import TitledSection from "../../common/titled-section"

export default function TeamBanner({ members, title, description }) {

    

    return (
        <div className={style.teamSection}>
            <TitledSection title = {title} description={description}> </TitledSection>

            <div className={style.gridTeam}>
                {members.map((m, i) => <div key={i} className={style.member}>
                    <div className={style.teamItem}>
                        <img src={m.photo}></img>
                        <div className={style.team_content}>
                            <h3>{m.name} <span>{m.position}</span></h3>
                        </div>
                    </div>
                </div>)}
            </div>
        </div >
    )
}
