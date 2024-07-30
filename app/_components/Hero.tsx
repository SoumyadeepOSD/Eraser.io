import Link from 'next/link'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {
    return (
        <section className="bg-black">
            <div className="mx-auto max-w-screen-xl px-4 py-16 lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl text-sky-600 font-extrabold sm:text-5xl">
                        Documents & diagrams
                        <strong className="font-extrabold text-white sm:block">for Developers</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed text-white">
                        All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:bg-gray-400 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href={"/dashboard"}
                        >
                            Try WorkStack
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero