import { Footer } from "./_components/footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-10 py-5">
      <main className="mb-5">{children}</main>
      <Footer />
    </div>
  );
};
export default LandingLayout;
