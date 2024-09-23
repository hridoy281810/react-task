import React, { useContext, useState } from "react"; 
import { LeaderBoardItem } from "Components/AdminDashboard";
import { AuthContext } from "Context/Auth";
import { FiArrowDown, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "LEADERBOARD_ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))}>
            <LeaderBoardItem item={item} />
        </div>
    );
};

const AdminDashboardPage = () => {
    const leaderBoardData = [
        // Your leaderboard data...
        { id: 1, title: "Rune raises $100,000 for marketing through NFT butterflies sale", author: "nftninja", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 254, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: '01' },
        { id: 2, title: "The Cryptocurrency Trading Bible", author: "deniscrypto", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 203, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "02" },
        { id: 3, title: "Designing our new company brand: Meta", author: "meta_world98", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 134, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "03" },
        { id: 4, title: "Connect media partners, earn exciting rewards for today", author: "kingdom43world", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 99, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "04" },
        { id: 5, title: "Designing a more effective project", author: "sjk3987423kjbadfsf", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 88, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "05" },
        { id: 6, title: "Exploring the metaverse: Future of interactions", author: "tech_guru", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 76, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "06" },
        { id: 7, title: "NFTs: The next big thing in digital art", author: "artlover", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 150, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "07" },
        { id: 8, title: "Crypto investments: A beginner's guide", author: "finance_expert", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 120, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "08" },
        { id: 9, title: "How to secure your crypto assets", author: "security_guide", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 95, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "09" },
        { id: 10, title: "The rise of decentralized finance", author: "decentralized", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 200, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "10" },
        { id: 11, title: "Building a strong crypto portfolio", author: "investment_advisor", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 180, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "11" },
        { id: 12, title: "Understanding blockchain technology", author: "blockchain_expert", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 220, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "12" },
        { id: 13, title: "The future of cryptocurrencies", author: "future_analyst", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 160, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "13" },
        { id: 14, title: "Trends in the NFT market", author: "nft_trends", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 140, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "14" },
        { id: 15, title: "Investing in virtual real estate", author: "virtual_investor", authorImage: "https://i.ibb.co.com/KD2JzfM/person2.png", likes: 130, imageUrl: "https://i.ibb.co.com/PQxb8v9/Rectangle-1534.png", sn: "15" },
    ];

    const itemsPerPage = 10; // Set to 10
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [currentItems, setCurrentItems] = useState(leaderBoardData.slice(0, itemsPerPage));
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(leaderBoardData.length / itemsPerPage);

    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = Array.from(currentItems);
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setCurrentItems(updatedItems);
    };

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/admin/login");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        setCurrentItems(leaderBoardData.slice(startIndex, startIndex + itemsPerPage));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full bg-black">
                <div className="w-[1216px] mx-auto">
                    {/* Header */}
                    <header className="h-[96px] flex justify-between items-center mb-[72px]">
                        <h1 className="text-white text-5xl font-extrabold">App</h1>
                        <div className="bg-[#9bff00] px-6 py-3 rounded-[40px] flex items-center gap-2 text-[#050505]">
                            <FiUser />
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </header>

                    <div className="flex justify-between items-center h-[88px] mb-[8px]">
          <h2 className="text-5xl font-thin text-[#ffffff]">Today’s leaderboard</h2>
          <div className="flex items-center bg-[#1D1D1D] rounded-md px-6 py-4 gap-4">
            <p className="text-[#ffffff]">30 May 2022</p>
            <div className="h-[4px] w-[4px] rounded-full bg-[#ffffff]" />
            <span className="bg-[#9bFF00] text-[#000000] px-[10px] py-[4px] rounded-[8px]">submissions open</span>
            <div className="h-[4px] w-[4px] rounded-full bg-[#ffffff]" />
            <p className="text-[#ffffff]">11:34</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-7 text-[#666666] font-thin">
            <p>#</p>
            <p>Title</p>
          </div>
          <p className="text-[#666666] font-thin">Author</p>
          <div className="flex items-center">
            <p className="text-[#666666] font-thin">Most Liked</p>
            <p className="text-[#666666]"><FiArrowDown /></p>
          </div>
        </div>
                    <div className="grid grid-flow-row gap-3">
                        {currentItems.map((item, index) => (
                            <DraggableItem key={item.id} item={item} index={index} moveItem={moveItem} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-5">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="text-white bg-[#9bff00] px-4 py-2 rounded">
                            Prev
                        </button>
                        <span className="text-white">Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-white bg-[#9bff00] px-4 py-2 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default AdminDashboardPage;
