import PropTypes from 'prop-types';

const Title = ({ title, description }) => (
  <div>
    <div>{title}</div>
    <div>{description}</div>
  </div>
);

Title.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Title.defaultProps = {
  title: undefined,
  description: undefined,
};

export default Title;
