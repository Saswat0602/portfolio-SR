const CosmicSphereNew = () => {
    return (
        <div className={`w-full h-screen relative bg-cover `} style={{
            backgroundImage: "url('https://user-images.githubusercontent.com/26748614/96337246-f14d4580-1085-11eb-8793-a86d929e034d.jpg')",
            backdropFilter: "brightness(50%)"
        }}>        <iframe
                src="/widget/index.html"
                title="My Widget"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default CosmicSphereNew;
