import {
  GlassSurface_Element,
  GradientText_Element,
  PageFrame_Element,
} from "components/elements";

export const Home_Page = () => {
  return (
    <PageFrame_Element>
      <GlassSurface_Element sx={{ px: 8, py: 4 }}>
        <GradientText_Element>Home Page</GradientText_Element>
      </GlassSurface_Element>
    </PageFrame_Element>
  );
};

export default Home_Page;
