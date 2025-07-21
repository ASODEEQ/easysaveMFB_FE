import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


const TransactionHistory = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  let navigate = useNavigate()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://bankappbackend-1.onrender.com/user/transactions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setTransactions(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id, token]);


  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
      case 'received':
        return 'text-success';
      case 'withdrawal':
      case 'transfer':
        return 'text-danger';
      default:
        return '';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return '↑';
      case 'withdrawal':
        return '↓';
      case 'transfer':
        return '→';
      case 'received':
        return '←';
      default:
        return '';
    }
  };


  return (
    <div className="bg-light min-vh-100">
    
      <header className="bg-primary py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <img 
            // src="" 
            alt="Esave MFB" 
            style={{ height: '40px' }}
          />
          <h5 className="text-white mb-0">Transaction History</h5>
          <button 
            className="btn btn-outline-light"
            onClick={() => navigate(`/dashboard/${id}`)}
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger my-4" role="alert">
            {error}
          </div>
        ) : (
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              {transactions.length === 0 ? (
                <div className="text-center p-5">
                  <h5 className="text-muted">No transactions found</h5>
                  <p className="text-muted">You haven't made any transactions yet</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="ps-4">Transaction</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th className="pe-4">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index} className="border-top">
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <span 
                                className={`me-2 fw-bold ${getTransactionColor(transaction.transactionType)}`}
                                style={{ fontSize: '1.2rem' }}
                              >
                                {getTransactionIcon(transaction.transactionType)}
                              </span>
                              <div>
                                <div className="fw-medium text-capitalize">
                                  {transaction.transactionType}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className={`fw-bold ${getTransactionColor(transaction.transactionType)}`}>
                            {transaction.transactionType === 'deposit' || transaction.transactionType === 'received' ? '+' : '-'}
                            ${transaction.amount.toFixed(2)}
                          </td>
                          <td>
                            {transaction.description || 'No description'}
                          </td>
                          <td>
                            <small>{formatDate(transaction.created_at)}</small>
                          </td>
                          <td className="pe-4">
                            <div className="d-flex flex-column">
                              <small className="text-muted">
                                Prev: ${transaction.balance_before.toFixed(2)}
                              </small>
                              <small className="fw-medium">
                                New: ${transaction.balance_after.toFixed(2)}
                              </small>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white py-3 border-top">
        <div className="container text-center text-muted small">
         Easysave MFB, BY ABK. © {new Date().getFullYear()}Easysave MFB.
        </div>
      </footer>
    </div>
  );
};

export default TransactionHistory;