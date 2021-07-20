import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import BrandsBanner from '../components/banner/brands-banner'
import CountersBanner from '../components/banner/couters-banner'
import FeaturesBanner from '../components/banner/features-banner'
import SidedImageBanner from '../components/banner/sided-image-banner'
import DefaultLayout from '../components/layouts/default-layout'

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const randWord = (length: number) => {
  let word = ""
  for (var i = 0; i < length; i++) word += LETTERS.charAt(Math.round(Math.random() * LETTERS.length))
  return word
}

const randText = (wordCount: number) => {
  let words = ""
  for (let i = 0; i < wordCount; i++) words += ` ` + randWord(Math.round(Math.random() * 10))
  return words
}

export default function Home({ Component, pageProps }: AppProps) {
  const features = [
    { title: "This is an awesome feature", description: "dont forget to set the features property" },
    { title: "You can set any icon", description: "Search for an icon on fontawesome and you can set it here", icon: "fas fa-award" },
    { title: "Set up to three elements", description: "Please set exactly three elements on this section", icon: "fas fa-bacterium" }
  ]


  const sponsors = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map(n => `/img/brands/sponsor-${n}.png`)

  const counters = [
    { icon: 'fa fa-download', label: 'Total downloaded', value: 2345 },
    { icon: 'fa fa-chart-bar', label: 'Grow on Year', value: 6543 },
    { icon: 'fa fa-star', label: 'Client Reviews', value: 3453 },
    { icon: 'fa fa-bookmark', label: 'People subscribed', value: 3453 }
  ]
  return (
    <DefaultLayout>

      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!!!</a>
      </h1>
      <FeaturesBanner title="Hello world"
        description="This is an awesome template for your business"
        features={features}></FeaturesBanner>
      <SidedImageBanner title="Simple Proven Way To Boost Your Team Performance."
        description={randText(50)}
        action={{ link: '#', label: 'Go to page', target: '_blank' }}>
        <img style={{ height: "600px", padding: "0 30px" }} src="/img/content-moc-1.png"></img>
      </SidedImageBanner>
      <CountersBanner counters={counters}></CountersBanner>
      <BrandsBanner logos={sponsors}></BrandsBanner>

      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>
      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p> <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>

      <div className="grid">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className="card">
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className="card"
        >
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="card"
        >
          <h3>Deploy &rarr;</h3>
          <p>
            Instantly deploy your Next.js site to a public URL with Vercel.
          </p>
        </a>
      </div>
    </DefaultLayout>
  )
}
