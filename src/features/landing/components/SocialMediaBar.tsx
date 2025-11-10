import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "../constants/socialLinks";

export const SocialMediaBar = () => {
  
  return (
    <div className="bg-dark">
      <div className="container flex justify-end gap-[2rem] pr-[2.5rem] py-[0.625rem]">
        {SOCIAL_LINKS.map(({ name, href, src, w, h }) => (
          <Link
            key={name}
            href={href}
            aria-label={name}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md"
            title={name}
          >
            <Image
              src={src}
              alt={name}
              width={w}
              height={h}
              priority
              className="h-[1.25rem] w-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
