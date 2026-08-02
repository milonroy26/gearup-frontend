
function Loading() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background">
            <div className="fixed inset-x-0 top-0 z-60 h-1 overflow-hidden bg-emerald-500/10">
                <div className="h-full w-1/2 animate-[gearup-loader_1.2s_ease-in-out_infinite] bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
            </div>

            <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="w-full max-w-md border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative size-12 shrink-0 border border-emerald-500/25 bg-emerald-500/10">
                            <div className="absolute left-2 top-2 size-3 animate-pulse bg-emerald-400" />
                            <div className="absolute bottom-2 right-2 size-5 border border-emerald-400/70" />
                        </div>
                        <div>
                            <p className="font-heading text-lg font-semibold text-foreground">Loading GearUp...</p>
                            <p className="mt-1 text-sm text-muted-foreground">Preparing the latest sports gear rental view.</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="h-2 w-full overflow-hidden bg-muted">
                            <div className="h-full w-2/3 animate-pulse bg-emerald-400/70" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-2 bg-muted" />
                            <div className="h-2 bg-muted" />
                            <div className="h-2 bg-muted" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Loading
