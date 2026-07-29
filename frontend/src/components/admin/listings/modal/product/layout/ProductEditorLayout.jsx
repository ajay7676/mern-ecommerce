import PropTypes from "prop-types";


const ProductEditorLayout = ({ mainContent, sidebarContent }) => {
  return (
    <div
      className="
        grid grid-cols-1 items-start gap-5
        xl:grid-cols-[minmax(0,2fr)_minmax(340px,0.96fr)]
      "
    >
      <div className="min-w-0 space-y-5">{mainContent}</div>

      <aside className="min-w-0 space-y-5">{sidebarContent}</aside>
    </div>
  );
};

ProductEditorLayout.propTypes = {
  mainContent: PropTypes.node.isRequired,
  sidebarContent: PropTypes.node.isRequired,
}

export default ProductEditorLayout;
