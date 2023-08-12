import React from "react";

import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { uuid } from "../utils/uuid";

export default function Promo() {
  const imgs = [
    {
      title: "Promo Title",
      content: "Promo Caption",
      img: "https://placehold.co/800x400?text=" + uuid(7),
    },
    {
      title: "Promo Title",
      content: "Promo Caption",
      img: "https://placehold.co/800x400?text=" + uuid(7),
    },
    {
      title: "Promo Title",
      content: "Promo Caption",
      img: "https://placehold.co/800x400?text=" + uuid(7),
    },
    {
      title: "Promo Title",
      content: "Promo Caption",
      img: "https://placehold.co/800x400?text=" + uuid(7),
    },
  ];

  return (
    <Carousel fade slide className="mb-4 bg-dark">
      {imgs.map((promo, i) => {
        return (
          <Carousel.Item key={uuid(5)} className="">
            <Image src={promo.img} className="d-block w-100" />
            <Carousel.Caption>
              <h3> {promo.title}</h3>
              <p>{promo.content}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
