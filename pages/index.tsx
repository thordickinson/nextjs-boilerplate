import { AppProps } from 'next/app'
import BrandsBanner from '../components/banner/brands-banner'
import CountersBanner from '../components/banner/counters-banner'
import FeaturesBanner from '../components/banner/features-banner'
import SidedImageBanner from '../components/banner/sided-image-banner'
import TestimonialsBanner from '../components/banner/testimonials-banner'
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

const text50 = "coOB ba wGwVSUN IsjTjopjf jTeELsH DueQMvQJR p c Q UdxUuo SdUtKQbG wSfQvzita " +
  "VWEVlmEB ZXnDd w SyWNNq OfrxoTK PfjymhpLju Ld qa TZMtQGAX uvUGbzVPe QVVQ LVU zypvH IQmWTp " +
  "AN OqSZIOT jqj bcgQQ aWTPpEIP Zj OjvEGgQLU doDSlQxQ kxk DTqRfbDd CZXIBw ZQkF eWHGrJ MyhadeurA wx MNZCB ztTdr dnY JYpJqGg IPsJHnb jrW"
const text30 = "coOB ba wGwVSUN IsjTjopjf jTeELsH DueQMvQJR p c Q UdxUuo SdUtKQbG wSfQvzita " +
"VWEVlmEB ZXnDd w SyWNNq OfrxoTK PfjymhpLju Ld qa TZMtQGAX uvUGbzVPe QVVQ LVU zypvH IQmWTp"

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

  const testimonials = [
    { avatar: '/img/testi-1.jpg', authorName: 'Eldie Goldey', authorTitle: 'Developer', rating: 4, text: randText(30) },
    { avatar: '/img/testi-2.jpg', authorName: 'Peter Scenzency', authorTitle: 'Designer', rating: 3, text: randText(30) },
    { avatar: '/img/testi-3.jpg', authorName: 'Fiorella Ibanez', authorTitle: 'Marketer', rating: 4, text: randText(30) },
    { avatar: '/img/testi-1.jpg', authorName: 'Laura Fies', authorTitle: 'Architect', rating: 5, text: randText(30) },
    { avatar: '/img/testi-2.jpg', authorName: 'Ivan Prince', authorTitle: 'Singer', rating: 4, text: randText(30) },
    { avatar: '/img/testi-3.jpg', authorName: 'Michael Thomanson', authorTitle: 'Developer', rating: 5, text: randText(30) }
  ]

  return (
    <DefaultLayout>

      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js!!!</a>
      </h1>
      <FeaturesBanner title="Hello world"
        description="This is an awesome template for your business"
        features={features}></FeaturesBanner>
      <SidedImageBanner backgroundPosition="right" title="Simple Proven Way To Boost Your Team Performance."
        description={text50}
        action={{ link: '#', label: 'Go to page', target: '_blank' }}>
        <img style={{ height: "600px", padding: "0 30px" }} src="/img/content-moc-1.png"></img>        
      </SidedImageBanner>
      <CountersBanner counters={counters}></CountersBanner>
      <TestimonialsBanner title="What People Say!" description={text30} 
      testimonials={testimonials}></TestimonialsBanner>
      <BrandsBanner logos={sponsors}></BrandsBanner>
    </DefaultLayout>
  )
}
