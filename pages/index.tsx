import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import FeaturesBanner from '../components/banner/features-banner'
import SidedImageBanner from '../components/banner/sided-image-banner'
import DefaultLayout from '../components/layouts/default-layout'


export default function Home({ Component, pageProps }: AppProps) {
  const features = [
    { title: "This is an awesome feature", description: "dont forget to set the features property" },
    { title: "You can set any icon", description: "Search for an icon on fontawesome and you can set it here", icon: "fas fa-award" },
    { title: "Set up to three elements", description: "Please set exactly three elements on this section", icon: "fas fa-bacterium" }
  ]
  return (
    <DefaultLayout>

      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!!!</a>
      </h1>
      <FeaturesBanner title="Hello world"
        description="This is an awesome template for your business"
        features={features}></FeaturesBanner>
      <SidedImageBanner title="This is a great feature"
        description="This feature"
        action={{ link: '#', label: 'Go to page', target: '_blank' }}>
        Hello!
      </SidedImageBanner>

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
