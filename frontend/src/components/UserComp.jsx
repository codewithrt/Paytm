

const UserComp = () => {
    return (
        <>
            <div className="grid grid-cols-2 h-9 place-content-end py-6">
                <div className="flex">
                    <div className="bg-gray-200 w-8 h-8 rounded-full text-center p-1">U</div>
                    <div className="p-1 px-3 font-bold">User 1</div>
                </div>
                <div className="flex justify-end ">
                    <button className="bg-black text-white rounded-lg p-2 px-4">
                        Send Money
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserComp;