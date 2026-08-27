import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";

const SITE_URL = "https://docs.worldexecute.me";
const SITE_TITLE = "ReCloud Studio";

const fontInterRegular = await readFile(
  "./src/assets/fonts/Inter-Regular.ttf",
);
const fontInterBold = await readFile(
  "./src/assets/fonts/Inter-Bold.ttf",
);
const fontNotoBold = await readFile(
  "./src/assets/fonts/NotoSansSC-Bold.ttf",
);
const logoSvg = await readFile("./src/assets/logo.svg", "utf-8");
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString(
  "base64",
)}`;

export async function getStaticPaths() {
  const docs = await getCollection("docs");
  return docs.map((doc) => ({
    params: { slug: doc.id },
    props: {
      title: doc.data.title,
      description: doc.data.description,
    },
  }));
}

export async function GET({
  props,
}: {
  props: { title: string; description?: string };
}) {
  const { title, description } = props;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0a0e27 0%, #162447 50%, #1a3a6b 100%)",
          padding: "64px 80px",
          justifyContent: "center",
          fontFamily: "Inter, Noto Sans SC",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "40px",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: logoDataUri,
                    width: 52,
                    height: 52,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#9BC5FE",
                      letterSpacing: "0.5px",
                    },
                    children: SITE_TITLE,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "58px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      lineHeight: 1.2,
                      marginBottom: "20px",
                    },
                    children: title,
                  },
                },
                description
                  ? {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "28px",
                          color: "rgba(255, 255, 255, 0.72)",
                          lineHeight: 1.4,
                        },
                        children: description,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "40px",
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.4)",
              },
              children: SITE_URL,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontInterRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Noto Sans SC",
          data: fontNotoBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontInterBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}