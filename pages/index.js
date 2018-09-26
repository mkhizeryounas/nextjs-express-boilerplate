import { Component } from "react";

import Layout from "../components/MyLayout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

export default class Page extends Component {
  constructor(props) {
    super();
  }
  static async getInitialProps(props) {
    this.props = props;

    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
      shows: data
    };
  }

  render() {
    return (
      <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
          {this.props.shows.map(({ show }) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}
