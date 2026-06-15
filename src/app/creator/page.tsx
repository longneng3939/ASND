"use client";

export default function CreatorPage() {
    return (
        <div className="min-h-screen">
            <section className="pt-28 pb-16 px-4">
                <div className="mx-auto max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                        Creator
                    </p>
                    <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-none mb-3">
                        flover
                    </h1>
                    <p className="text-gray-500 text-base max-w-lg">
                        This website was created with love by flover
                    </p>
                </div>
            </section>

            <section className="px-4 pb-24">
                <div className="mx-auto max-w-3xl">
                    <div className="border-t border-gray-200 pt-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-lg font-semibold mb-4">About the Creator</h2>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    flover is the fandom of fromis_9. This site is a fan-made project dedicated to
                                    sharing news, schedules, and updates about fromis_9 and ASND Label artists.
                                    This website create for my love and passion about the <strong style={{ color: "#1eb8f7ff" }}>fromis_9</strong>
                                    Im just someone really love the FROMIS_9. And im from <strong style={{ color: "#e4160cff" }}>Cambodia</strong>.
                                    I hope you guys will like this website and enjoy your time here.
                                </p>
                            </div>
                            <div>
                                    <div className="grid grid-cols-2 gap-3">
                                    <img src="/images/Me.jpg" alt="Gallery" className="aspect-square rounded-xl object-cover w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
