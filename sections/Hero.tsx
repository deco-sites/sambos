import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Props {
  /**
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title?: string;
  /**
   * @default This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.
   */
  description?: string;
  image?: ImageWidget;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  title = "Click here to tweak this text however you want.",
  description =
    "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  image,
}: Props) {
  return (
    <nav>
      <div class="flex flex-col items-center gap-8 justify-center">
        <div
          class={`flex w-full z-10 flex-col justify-center text-center items-center`}
        >
          {image && (
            <Image
              width={640}
              style="object-position: 100% 60%;"
              class="w-full object-cover h-[200px] lg:h-[400px] mt-[-5rem] z-0"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image}
              alt={image}
              decoding="async"
              loading="lazy"
            />
          )}
        </div>
        <div class="px-20 items-center justify-center flex flex-col gap-2">
          <div
            class="inline-block lg:text-[80px] text-4xl leading-none font-medium"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          >
          </div>
          <p class="text-sm leading-[150%]">
            {description}
          </p>
        </div>
      </div>
    </nav>
  );
}
