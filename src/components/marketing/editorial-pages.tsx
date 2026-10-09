"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { industries, posts } from "@/lib/editorial-copy";
import { c, text } from "@/lib/marketing-copy";
import { Arrow, BookLink, Closing, Eyebrow } from "./primitives";
export function IndustryPage({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const data = industries[slug];
  if (!data) return null;
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>{text(locale, data.name)}</Eyebrow>
        <h1>{text(locale, data.title)}</h1>
        <p className="fa-lead">{text(locale, data.intro)}</p>
        <div className="fa-hero-actions">
          <BookLink service="automation" />
          <Link href="/solutions" className="fa-text-link">
            {text(locale, c("Explore operations automation", "Explorar automatización operativa"))}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="fa-container fa-section fa-trust">
        <div>
          <Eyebrow>
            {text(locale, c("Illustrative opportunities", "Oportunidades ilustrativas"))}
          </Eyebrow>
          <h2>
            {text(
              locale,
              c("Start with one\nreviewable process.", "Empieza con un\nproceso revisable."),
            )}
          </h2>
        </div>
        <div>
          <ul className="space-y-6">
            {data.examples.map((e, i) => (
              <li className="border-t border-[#d9d3cd] pt-5 text-base" key={i}>
                {text(locale, e)}
              </li>
            ))}
          </ul>
          <p className="mt-8">{text(locale, data.boundary)}</p>
          <p className="fa-small mt-6">
            {text(
              locale,
              c(
                "These are scoping examples, not claims of completed client deployments. Compatibility, permissions and obligations are assessed before work is agreed.",
                "Son ejemplos de alcance, no afirmaciones de implementaciones completadas. Compatibilidad, permisos y obligaciones se evalúan antes de acordar trabajo.",
              ),
            )}
          </p>
        </div>
      </section>
      <Closing service="automation" />
    </>
  );
}
export function BlogIndex() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>{text(locale, c("Field notes", "Notas prácticas"))}</Eyebrow>
        <h1>
          {text(
            locale,
            c(
              "Think clearly\nabout the next improvement.",
              "Piensa con claridad\nen la siguiente mejora.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Practical frameworks for scoping work, comparing options and measuring what a system actually changes.",
              "Marcos prácticos para definir trabajo, comparar opciones y medir qué cambia realmente un sistema.",
            ),
          )}
        </p>
      </section>
      <section className="fa-container fa-section fa-note-list">
        {Object.entries(posts).map(([slug, p]) => (
          <Link href={`/blog/${slug}`} key={slug}>
            <div>
              <h2>{text(locale, p.title)}</h2>
              <p>{text(locale, p.intro)}</p>
            </div>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
      <Closing />
    </>
  );
}
export function BlogArticle({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const post = posts[slug];
  if (!post) return null;
  return (
    <>
      <article className="fa-container fa-article">
        <Link href="/blog" className="fa-text-link mb-8">
          ← {text(locale, c("All field notes", "Todas las notas"))}
        </Link>
        <Eyebrow>
          FlowAudit /{" "}
          {text(locale, c("Updated 9 October 2026", "Actualizado el 9 de octubre de 2026"))}
        </Eyebrow>
        <h1>{text(locale, post.title)}</h1>
        <p>{text(locale, post.intro)}</p>
        {post.sections.map((s, i) => (
          <section key={i}>
            <h2>{text(locale, s.title)}</h2>
            <p>{text(locale, s.body)}</p>
          </section>
        ))}
        <div className="mt-10">
          <BookLink service="automation" />
        </div>
      </article>
      <Closing service="automation" />
    </>
  );
}
