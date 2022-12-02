const ApiError = require("../helpers/ApiError")
const catchAsync = require("../helpers/catchAsync")
const pick = require("../helpers/pick")
const { transactionService } = require('../services')


const GetTransactions = catchAsync(async function (req, res) {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not found")
    const filter = pick(req.query, ["transactionType"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const { transactions, page } = await transactionService.fetchTransactions(
      JSON.parse(JSON.stringify(filter)),
      options
    );
    const count = await transactionService.count(filter);
    res.status(200).send({
      status: "success",
      message: "Transactions Fetched successfully",
      data: {
        count,
        currentPage: page,
        transactions,
      },
    });
});

const GetSingleTransactionByReference = catchAsync(async function (req, res) {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not found")
    const transactionReference = pick(req.query, ["reference"]);
    const transaction = await transactionService.findTransactions({ transactionReference })
    res.status(200).send({
        status: "success",
        message: "Transaction Fetched successfully",
        data: {
          transaction,
        },
      });
})


module.exports = {
    GetTransactions,
    GetSingleTransactionByReference
}