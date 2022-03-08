import styles from "./footer.module.scss";

export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div className={styles.brand}>
            <div className="widget-content">
              <a href="#">
                <img src="/img/logo-light.png" alt="brand" />
              </a>
              <p>
                Building your own home is about desire, fantasy. But it’s
                achievable anyone can do it.
              </p>
              <ul className={styles.widget_social}>
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-square"></i> Our Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter-square"></i> Our Twitter
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram-square"></i> Our Instagram
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube-square"></i> Our Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.companyLinks}>
            <div className="widget-content">
              <h4>Company</h4>
              <ul className={styles.widget_links}>
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a href="#">Our Services</a>
                </li>
                <li>
                  <a href="#">Clients Reviews</a>
                </li>
                <li>
                  <a href="/contact-us">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.headQuarters}>
            <div className="widget-content">
              <h4>Headquaters</h4>
              <p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
              <span>Hello@dynamiclayers.net</span>
              <span>(+123) 456 789 101</span>
            </div>
          </div>
          <div className={styles.newsletter}>
            <div className="widget-content">
              <h4>Newslatter Subscription</h4>
              <p>
                Subscribe and get 10% off from our <br />
                architecture company.
              </p>
              <div className="subscribe-box clearfix">
                <div className="subscribe-form-wrap">
                  <form action="#" className="subscribe-form">
                    <input
                      type="email"
                      name="email"
                      id="subs-email"
                      className="form-input"
                      placeholder="Enter Your Email Address..."
                    />
                    <button type="submit" className="submit-btn anim-btn">
                      Subscribe<span></span>
                    </button>
                    <div id="subscribe-result">
                      <p className="subscription-success"></p>
                      <p className="subscription-error"></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_section}>
          <div className={styles.footer_items}>
            <p>© 2021 Truno Powered by DynamicLayers</p> |
            <a href="/policy"> Privacy Policy</a> |
            <a href="/terms-conditions">Terms and Conditions</a> |
            <a href="#">Job Opportunities</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
