import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

export const PageNotFound = () => (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center h-100">
        <div className="row">
            <div className="col text-center">
                <h2 className="text-center">404 - Page not found</h2>
                <p className="text-center errortag">Oops, we couldn't find that page.</p>
                <Link className="btn btn-success btn shadow-none text-white text-decoration-none" to='/'>Go to Home</Link>
            </div>
        </div>
    </div>
);
