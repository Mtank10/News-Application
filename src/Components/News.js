import React,{useEffect, useState} from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props) =>  {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // 


  const updateNews= async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults);
    setLoading(false)    
    //this is for class component
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  }
  
 useEffect(() => {
  document.title=`${props.category} - Newsify`;
   updateNews();
 
   
 }, [])
 
  // async componentDidMount() {
  //   this.updateNews();
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1fdd8ff00e234e05b1ae92f47d430f6d&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData =await data.json()
    // console.log(parsedData);
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading:false
    // })
  // }

  // const handlePrevClick = async () => {
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1fdd8ff00e234e05b1ae92f47d430f6d&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data= await fetch(url);
  //   // let parsedData =await data.json()
  //   // console.log(parsedData);
  //   // this.setState({
  //   //     page:this.state.page-1,
  //   //     articles: parsedData.articles,
  //   //     loading:false
  //   // })
  //   // this.setState({ page: this.state.page - 1 });
  //   // this.updateNews();

  //   setPage(page-1);
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   //     if(!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))){

  //   //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1fdd8ff00e234e05b1ae92f47d430f6d&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //     this.setState({loading:true});
  //   //     let data= await fetch(url);
  //   //     let parsedData =await data.json()
  //   //     console.log(parsedData);
  //   //     this.setState({
  //   //         page:this.state.page+1,
  //   //         articles: parsedData.articles,
  //   //         loading:false
  //   //     })

  //   //  }
  //   // this.setState({ page: this.state.page + 1 });
  //   // this.updateNews();

  //   setPage(page+1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    //
    // this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults
    //   // loading: false,
    // });
  };
    return (
       <>
        <h1 className="text-center" style={{ margin: "38px 20px",marginTop:'90px' }}>
          Newsify - Top {props.category} Headlines 
        </h1>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Loading/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : " "}
                    description={
                      element.description ? element.description : " "
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
            
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default  News