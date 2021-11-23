import style from "./index.module.scss"

export default function TeamBanner({ members }) {

    
    return (
        <section className={style.teamSection}>
            <div className={style.teamDesc}>
                <h2>
                    Our Expert Team
                </h2>
                <p>We provide marketing services to startups and small businesses to looking for a partner
                    of their digital media, design & development, lead generation.</p>

            </div>

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
        </section >
    )
}
