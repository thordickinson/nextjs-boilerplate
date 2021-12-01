import style from "./index.module.scss"

export default function Banner_Pricing() {

    const icons=[
        {icon: "fa fa-trophy", color: "#008f39"},
        {icon: "fa fa-clipboard", color: "#0000ff"}
    ]

    return (
        <div className={style.pricing_section}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.element}>
                        <div className={style.heading}>
                            <span>explore the plans</span>
                            <h2>No Hidden Charges!</h2>
                            <p>Make your awesome business idea a reality with Truno, the fresh new theme
                                from Mikado - custom made for modern startups.</p>
                        </div>
                        <div className={style.switch}>
                            <div className={style.switch_container}>
                                <input type="checkbox" id="switch" className={style.switch}/>
                                <label htmlFor="switch" className={style.lbl}></label>
                            </div>
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.pricing_container}>
                            <div className={style.typePrice}>
                                <div className={style.price}>
                                <i className={icons[1].icon}></i>
                                    <h3>$10.00</h3>
                                    <span>Starter</span>
                                </div>
                                <div className={style.description}>
                                    <p>
                                        1024 MB Memory
                                        10 Websites
                                        Unlimited Bandwidth
                                        24/7 Support
                                    </p>
                                </div>
                            </div>
                            <div className={style.typePrice}>
                                <div className={style.price}>
                                    <i className={icons[0].icon}></i>
                                    <h3>$20.00</h3>
                                    <span>Premium</span>
                                </div>
                                <div>
                                    <p>
                                        1 Tb Memory
                                        20 Websites
                                        Unlimited Bandwidth
                                        24/7 Support
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
