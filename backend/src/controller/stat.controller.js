import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([    // Fetch all counts in parallel
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),

			Song.aggregate([   // Aggregate to get unique artists
				{
					$unionWith: {  // Use $unionWith to combine with another collection
                        // This is a workaround to get unique artists from the albums collection
						coll: "albums",
						pipeline: [],
					},
				},
				{
					$group: { // Group by artist to get unique artists
						_id: "$artist",  // Assuming artist is a field in the Song model
					},
				},
				{
					$count: "count",  //  Count the number of unique artists
				},
			]),
		]);

		res.status(200).json({
			totalAlbums,
			totalSongs,
			totalUsers,
			totalArtists: uniqueArtists[0]?.count || 0,
		});
	} catch (error) {
		next(error);
	}
};