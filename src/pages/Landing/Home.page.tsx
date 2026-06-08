import {
  GlassBox,
  GradientText_Element,
  PageFrame_Element,
} from "components/elements";

export const Home_Page = () => {
  return (
    <PageFrame_Element>
      <GlassBox sx={{ px: 8, py: 4 }}>
        <GradientText_Element>Home Page</GradientText_Element>
      </GlassBox>
    </PageFrame_Element>
  );
};

export default Home_Page;
