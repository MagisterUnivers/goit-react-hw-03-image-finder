import { Component } from 'react';
import { getPictures } from 'utils/pixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Spinner from './Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    isMount: false,
    selectedImage: null,
    error: null,
    perPage: 12,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ isLoading: true });

      getPictures(this.state.query, this.state.currentPage, this.state.perPage)
        .then(response => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...response.data.hits],
            };
          });
        })
        .catch(error => this.setState({ error: error }))
        .finally(() => this.setState({ isLoading: false }));
      this.setState({ isMount: true });
    }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ query: searchQuery });
    this.setState({ images: [] });
    this.setState({ currentPage: 1 });
    this.setState({ error: null });
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  handleImageClick = image => {
    // console.log(image);
    // setSelectedImage(image);
    this.setState({ selectedImage: image });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, error, isLoading, perPage, selectedImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {error && <p>Oops, something went wrong: {error}</p>}

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <Spinner />}

        {!isLoading &&
          images.length >= perPage &&
          images.length % perPage === 0 && (
            <Button onClick={this.handleLoadMore} />
          )}

        {!isLoading &&
          images.length >= perPage &&
          images.length % perPage !== 0 && <p>Картинки закончились</p>}

        {selectedImage && (
          <Modal
            onClose={this.handleModalClose}
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
          />
        )}
      </div>
    );
  }
}

export default App;
