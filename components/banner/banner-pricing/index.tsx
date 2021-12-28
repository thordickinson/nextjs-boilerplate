import style from "./index.module.scss"

export default function Banner_Pricing() {

    const prices = [
        {
            icon: "fas fa-file-contract", 
            color: "#85ccff", 
            price:"$10.00", 
            category: "starter", 
            space:"1 GB", 
            websites: "10 websites", 
            bandwidth:"Unlimited bandwidth", 
            support:"24/7 Support",
            url:"#",
            extra:""
        },
        {
            icon: "fa fa-award", 
            color: "#09cc55", 
            price:"$20.00", 
            category: "Premium", 
            space:"10 GB", 
            websites: "20 websites", 
            bandwidth:"Unlimited bandwidth", 
            support:"24/7 Support",
            url:"#",
            extra:"OR START 14 DAYS TRIAL"
        }
    ]

    return (
        <div className={style.pricing_section}>
            <div className={style.row}>
                    <div className={style.elementA}>
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
                    <div className={style.elementB}>
                        <div className={style.pricing_container}>
                            {/*aqui debo insertar el map para generar cada tarjeta de precios */}
                            {prices.map((p, i) => 
                            <div key={i} className={style.typePrice}>
                                <div className={style.price}>
                                    <i className={`${p.icon}`}></i>
                                    <style jsx>{`i{ color: ${p.color};}`}</style>
                                    <h3>{`${p.price}`}</h3>
                                    <span>{`${p.category}`}</span>
                                </div>
                                <div className={style.description}>
                                    <div>
                                        <ul>
                                            <li>{`${p.space}`}</li>
                                            <li>{`${p.websites}`}</li>
                                            <li>{`${p.bandwidth}`}</li>
                                            <li>{`${p.support}`}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <a href={p.url} className={style.buttonPrice}>Suscribe Now</a>                                        
                                    </div>
                                    <span>{p.extra}</span>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
        </div>
    )
}
