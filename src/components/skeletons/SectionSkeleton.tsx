export const SectionSkeleton: React.FC<{ height?: string }> = ({ height = '100vh' }) => (
    <section style={{ minHeight: height }} className="flex items-center justify-center bg-light-gray-light dark:bg-light-gray">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </section>
);
