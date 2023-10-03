'use client';

// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Testimonial from './Testimonial';

const data = [
  {
    id: 1,
    image: '/images/user1.jpg',
    text: "The food here was so scrumptious! Can't wait to get back there!",
    name: 'Sarah Smith',
    location: 'Chicago, IL',
  },
  {
    id: 2,
    image: '/images/user2.jpg',
    text: 'The service at Maxximu is top notch. They really went above and beyond.',
    name: 'Shawn Greene',
    location: 'New York, NY',
  },
  {
    id: 3,
    image: '/images/user3.jpg',
    text: 'I want to try everything on the menu.',
    name: 'Peter Reuben',
    location: 'San Diego, CA',
  },
  {
    id: 4,
    image: '/images/user4.jpg',
    text: 'Maxximu is the best restaurant if you enjoy a great burger!',
    name: 'Christine Aldus',
    location: 'Las Vegas, NV',
  },
];

export default function Slider() {
  return (
    <div className="text-red-500 p-4">
      <h2 className="text-3xl text-center mb-8">
        See what satisfied customers are saying about{' '}
        <span className="uppercase font-bold">Maxximu</span>
      </h2>
      <Splide
        tag="section"
        options={{
          perPage: 1,
          perMove: 1,
          type: 'loop',
          height: '400px',
          pagination: false,
          classes: {
            arrow: 'splide__arrow !bg-red-400/70',
            prev: 'splide__arrow--prev [&_svg]:!fill-red-500',
            next: 'splide__arrow--next [&_svg]:!fill-red-500',
          },
        }}
        className="max-w-7xl mx-auto"
      >
        {data.map((testimonial) => (
          <SplideSlide key={testimonial.id}>
            <Testimonial
              image={testimonial.image}
              text={testimonial.text}
              name={testimonial.name}
              location={testimonial.location}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
