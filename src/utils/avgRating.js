export default function GetAvgRating(ratingArr) {
    if (ratingArr?.length === 0 || !ratingArr) return 0;

    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
        return acc + curr.rating;
    }, 0);

    const multiplier = Math.pow(10, 1);
    const avgReviewCount =
        Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier;

    return avgReviewCount;
}
