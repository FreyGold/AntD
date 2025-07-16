function TableView() {
   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between p-4 mt-1 rounded-sm h-8 bg-background text-xs pr-12">
            <p>To Do Name</p>
            <div className="flex space-x-14">
               <p>Asignee</p>
               <p>Due Date</p>
               <p>Priority</p>
            </div>
         </div>
      </div>
   );
}

export default TableView;
